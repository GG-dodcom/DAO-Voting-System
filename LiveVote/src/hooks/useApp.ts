import { getInstance } from '@snapshot-labs/lock/plugins/vue3';
import domains from '@/../snapshot-spaces/spaces/domains.json';
import aliases from '@/../snapshot-spaces/spaces/aliases.json';
import { getInjected } from '@snapshot-labs/lock/src/utils';
// import { useStorage } from '@vueuse/core';

const domainName = window.location.hostname;
const env = import.meta.env.VITE_ENV;
let domain = domains[domainName];

if (env === 'develop') {
  domain = import.meta.env.VITE_VIEW_AS_SPACE ?? domain;
}

const domainAlias = Object.keys(aliases).find(
  (alias) => aliases[alias] === domain
);

const isReady = ref(false);

export function useApp() {
  const { login } = useWeb3();

  // const termsAccepted = useStorage('snapshot.termsAccepted', false);

  function connectWallet() {
    const auth = getInstance();

    // if (!termsAccepted.value) return;

    if (window?.parent === window)
      // Auto connect if previous session was connected
      auth.getConnector().then((connector) => {
        if (connector) return login(connector);
      });

    const injected = computed(() => getInjected());
    // edge case if MM and CBW are both installed
    if (injected.value?.id === 'metamask') return;
  }

  async function init() {
    isReady.value = true;
    connectWallet();
  }

  return {
    domain,
    domainAlias,
    env,
    isReady,
    init,
  };
}
