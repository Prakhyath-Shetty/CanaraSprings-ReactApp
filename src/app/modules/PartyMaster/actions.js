export const GET_PARTYMASTER="GET_PARTYMASTER";


export const fetchPartyMaster = () => ({
    type: GET_PARTYMASTER,
    payload: {
      code:"1210",
      name: 'Executive Engineer',
      address: 'Karnataka Power CORPN.Ltd',
      category:"Retail Dealer"
      }
  });