/* eslint-disable camelcase */
import { getBackendParameter } from './utils';

export async function initContractAdress() {
  const r1 = getBackendParameter('STAKING_CONTRACT', (contract_address) => {
    window.staking_contract_address = contract_address;
  });

  const r2 = getBackendParameter(
    'FAMERS_REGISTER_CONTRACT',
    (contract_address) => {
      window.famers_register_contract_address = contract_address;
    }
  );

  const r3 = getBackendParameter(
    'DEPPROFILES_REGISTER_CONTRACT',
    (contract_address) => {
      window.depprofiles_register_contract_address = contract_address;
    }
  );

  const r4 = getBackendParameter(
    'CREDIT_PROFILES_REGISTER_CONTRACT',
    (contract_address) => {
      window.credit_profiles_register_contract_address = contract_address;
    }
  );

  const r5 = getBackendParameter(
    'DATA_PROVIDER_CONTRACT',
    (contract_address) => {
      window.data_provider_contract_address = contract_address;
    }
  );

  const r6 = getBackendParameter('VOTES_CALC_CONTRACT', (contract_address) => {
    window.votes_calc_contract_address = contract_address;
  });

  const r7 = getBackendParameter('USAGE_CALC_CONTRACT', (contract_address) => {
    window.usage_calc_contract_address = contract_address;
  });

  const r8 = getBackendParameter('CREDIT_CONTRACT', (contract_address) => {
    window.credit_contract_address = contract_address;
  });

  const r9 = getBackendParameter('LIQLEV_CONTRACT', (contract_address) => {
    window.liqlev_contract_address = contract_address;
  });
  await Promise.all([r1, r2, r3, r4, r5, r6, r7, r8, r9]);
}
