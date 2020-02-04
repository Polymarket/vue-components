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

// -------- RAW COSMOS PROPOSAL ------------

// {
//   "type": "irishub/gov/ParameterProposal",
//   "value": {
//     "BasicProposal": {
//       "proposal_id": "1",
//       "title": "Raising the difficulty level for Validators",
//       "description": "Now that the mainnet has been running for three months, keyss time to raise the difficulty level a little bit! More details can be found here: https://forum.irisnet.org/t/parameter-changes-raising-the-difficulty-level-a-little-bit-for-validators/127",
//       "proposal_type": "ParameterChange",
//       "proposal_status": "Passed",
//       "tally_result": {
//         "yes": "503291018.7266195192",
//         "abstain": "0.0000000000",
//         "no": "5031635.1210000000",
//         "no_with_veto": "0.0000000000"
//       },
//       "submit_time": "2019-07-02T05:50:46.408707608Z",
//       "deposit_end_time": "2019-07-03T05:50:46.408707608Z",
//       "total_deposit": [
//         {
//           "denom": "iris-atto",
//           "amount": "2020000000000000000000"
//         }
//       ],
//       "voting_start_time": "2019-07-02T12:06:55.770994064Z",
//       "voting_end_time": "2019-07-07T12:06:55.770994064Z"
//     },
//     "params": [
//       {
//         "subspace": "slashing",
//         "key": "MinSignedPerWindow",
//         "value": "0.7"
//       },
//       {
//         "subspace": "slashing",
//         "key": "DowntimeJailDuration",
//         "value": "36h"
//       },
//       {
//         "subspace": "slashing",
//         "key": "SlashFractionDowntime",
//         "value": "0.0003"
//       }
//     ]
//   }
// }

// -------- RAW IRIS PROPOSAL ------------
// {
//   "proposal_content": {
//     "type": "gov/TextProposal",
//     "value": {
//       "title": "Adjustment of blocks_per_year to come aligned with actual block time",
//       "description": "This governance proposal is for adjustment of blocks_per_year parameter to normalize the inflation rate and reward rate.\\n ipfs link: https://ipfs.io/ipfs/QmXqEBr56xeUzFpgjsmDKMSit3iqnKaDEL4tabxPXoz9xc"
//     }
//   },
//   "proposal_id": "1",
//   "proposal_status": "Passed",
//   "final_tally_result": {
//     "yes": "97118903526799",
//     "abstain": "402380577234",
//     "no": "320545400000",
//     "no_with_veto": "0"
//   },
//   "submit_time": "2019-03-20T06:41:27.040075748Z",
//   "deposit_end_time": "2019-04-03T06:41:27.040075748Z",
//   "total_deposit": [
//     {
//       "denom": "uatom",
//       "amount": "512100000"
//     }
//   ],
//   "voting_start_time": "2019-03-20T20:43:59.630492307Z",
//   "voting_end_time": "2019-04-03T20:43:59.630492307Z"
// }
