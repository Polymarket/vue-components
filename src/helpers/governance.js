/**
 * These helper functions take the raw responses from the respective API
 * and parse the (structurally varied) responses into a standardized object
 * This allows for abstraction of the chain since the parsed proposal
 * objects are now the same structure
 */

/**
 * @function processCosmosGovernanceProposals
 * @description parses the raw api response and returns the results
 */
export const processCosmosGovernanceProposals = async (val) => {
  try {
    const processedProposals = [];
    const proposals = JSON.parse(JSON.stringify(val));

    proposals.forEach((proposal) => {
      const y = parseFloat(proposal.final_tally_result.yes);
      const a = parseFloat(proposal.final_tally_result.abstain);
      const n = parseFloat(proposal.final_tally_result.no);
      const v = parseFloat(proposal.final_tally_result.no_with_veto);
      const total = (y + a + n + v);

      const yP = y / total;
      const aP = a / total;
      const nP = n / total;
      const vP = v / total;

      const parsedTally = {
        yes: y,
        abstain: a,
        no: n,
        no_with_veto: v,
        total,
        yes_percent: yP,
        abstain_percent: aP,
        no_percent: nP,
        no_with_veto_percent: vP,
      };
      const donutValues = [yP, nP, aP, vP];
      const donutPercentValues = [100 * yP, 100 * nP, 100 * aP, 100 * vP];

      processedProposals.push({
        id: proposal.id,
        title: proposal.content.value.title,
        description: proposal.content.value.description,
        status: proposal.proposal_status,
        tally: parsedTally,
        submit_time: proposal.submit_time,
        deposit_end_time: proposal.deposit_end_time,
        voting_start_time: proposal.voting_start_time,
        voting_end_time: proposal.voting_end_time,
        total_deposit: proposal.total_deposit,
        donutValues,
        donutPercentValues,
      });
    });

    return processedProposals;
  } catch (e) {
    throw new Error(e);
  }
};


/**
 * @function processIrisGovernanceProposals
 * @description parses the raw api response and returns the results
 */
export const processIrisGovernanceProposals = async (val) => {
  try {
    const processedProposals = [];
    const proposals = JSON.parse(JSON.stringify(val));

    proposals.forEach((proposal) => {
      const y = parseFloat(proposal.value.BasicProposal.tally_result.yes);
      const a = parseFloat(proposal.value.BasicProposal.tally_result.abstain);
      const n = parseFloat(proposal.value.BasicProposal.tally_result.no);
      const v = parseFloat(proposal.value.BasicProposal.tally_result.no_with_veto);
      const total = (y + a + n + v);

      const yP = y / total;
      const aP = a / total;
      const nP = n / total;
      const vP = v / total;
      const donutValues = [yP, nP, aP, vP];
      const donutPercentValues = [100 * yP, 100 * nP, 100 * aP, 100 * vP];

      const parsedTally = {
        yes: y,
        abstain: a,
        no: n,
        no_with_veto: v,
        total,
        yes_percent: yP,
        abstain_percent: aP,
        no_percent: nP,
        no_with_veto_percent: vP,
      };

      processedProposals.push({
        id: proposal.value.BasicProposal.proposal_id,
        title: proposal.value.BasicProposal.title,
        description: proposal.value.BasicProposal.description,
        status: proposal.value.BasicProposal.proposal_status,
        tally: parsedTally,
        submit_time: proposal.value.BasicProposal.submit_time,
        deposit_end_time: proposal.value.BasicProposal.deposit_end_time,
        voting_start_time: proposal.value.BasicProposal.voting_start_time,
        voting_end_time: proposal.value.BasicProposal.voting_end_time,
        total_deposit: proposal.value.BasicProposal.total_deposit,
        donutValues,
        donutPercentValues,
      });
    });

    return processedProposals;
  } catch (e) {
    throw new Error(e);
  }
};
