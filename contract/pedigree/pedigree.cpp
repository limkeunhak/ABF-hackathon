#include <eosiolib/eosio.hpp>

using namespace eosio;

class pedigree : public eosio::contract {
  public:
    using contract::contract;
    pedigree(account_name self):contract(self) {
      authnumbers auth_numbers(_self, _self);
      if (auth_numbers.begin() == auth_numbers.end()) {
        auth_numbers.emplace(_self, [&](auto& auth_number) {
          auth_number.number = 0;
          auth_number.count = 0;
        });
      }
    }

    // After pusing transaction and we need to get the Tx_id for auth_number
    void add(account_name admin, account_name owner, std::string encrypted_info, std::string iris_scandata) {
      require_auth(admin);
      // Check whether auth_number is correct

      authnumbers auth_numbers(_self, _self);
      auto auth_iter = auth_numbers.begin();
      uint64_t number = (auth_iter->count) + 1;

      animalinfos _animal_infos(_self, owner);

      auto info_iter = _animal_infos.find(number);
      if (info_iter == _animal_infos.end()) {
        _animal_infos.emplace(admin, [&](auto& animal_info) {
            animal_info.auth_number = number;
            animal_info.owner = owner;
            animal_info.encrypted_info = encrypted_info;
            animal_info.iris_scandata = iris_scandata;
        });

        auth_iter = auth_numbers.find(0);
        auth_numbers.modify(auth_iter, get_self(), [&](auto& auth_number) {
            auth_number.count = number;
       });

      } else {
        print("Already in the table");
      }
    }

    void transfer() {
      //XXX
    }

    void erase(account_name admin, account_name owner, uint64_t auth_number) {
       //require_auth(user);
       //XXX:Need to check auth.
      animalinfos _animal_infos(_self, owner);
      auto iter = _animal_infos.find(auth_number);
      eosio_assert(iter != _animal_infos.end(), "Record does not exist");
      _animal_infos.erase(iter);
    }

    void reset() {
      authnumbers auth_numbers(_self, _self);
      auto itr = auth_numbers.begin();
      while (itr != auth_numbers.end()) {
        itr = auth_numbers.erase(itr);
      }

      auth_numbers.emplace(_self, [&](auto& auth_number) {
        auth_number.number = 0;
        auth_number.count = 0;
      });
    }



  private:
    ///@abi table animalinfos i64
    struct animal_info {
      uint64_t auth_number;
      account_name owner;
      std::string encrypted_info;
      std::string iris_scandata;

      uint64_t primary_key() const {
        return auth_number;
      };

      uint64_t by_owner() const {
        return owner;
      };

      EOSLIB_SERIALIZE(animal_info, (auth_number)(owner)(encrypted_info)(iris_scandata));
    };
    typedef eosio::multi_index<N(animalinfos), animal_info, indexed_by<N(owner), const_mem_fun<animal_info, uint64_t, &animal_info::by_owner>>> animalinfos;

    ///@abi table authnumbers i64
    struct auth_number {
      // For global counter
      uint64_t number;
      uint64_t count;

      uint64_t primary_key() const {
        return number;
      };
      EOSLIB_SERIALIZE(auth_number,(number)(count));
    };

    typedef eosio::multi_index<N(authnumbers), auth_number> authnumbers;

};

EOSIO_ABI(pedigree, (add)(transfer)(erase)(reset))
