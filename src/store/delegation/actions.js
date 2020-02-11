/*
export function someAction (context) {
}
*/
export const beginDelegation = async ({ state }) => {
  console.log('delegating', state.delegationAmount, 'to validator', state.targetValidator);
};
