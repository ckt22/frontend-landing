export const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "AddressInsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "claimer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Claimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "regDeadline",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "arrivalTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "location",
        type: "bytes32",
      },
    ],
    name: "EventCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "participant",
        type: "address",
      },
    ],
    name: "UserAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "participant",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "onTime",
        type: "bool",
      },
    ],
    name: "UserCheckedArrival",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "invitee",
        type: "address",
      },
    ],
    name: "UserInvited",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_eventId",
        type: "uint256",
      },
    ],
    name: "acceptInvite",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "activeEvents",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_eventId",
        type: "uint256",
      },
    ],
    name: "checkArrivals",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_regDeadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_arrivalTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "commitment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "penalty",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_location",
        type: "bytes32",
      },
      {
        internalType: "address[]",
        name: "_invitees",
        type: "address[]",
      },
    ],
    name: "createEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "encoded",
        type: "bytes32",
      },
    ],
    name: "decodeCoordinates",
    outputs: [
      {
        internalType: "int256",
        name: "latitude",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "longitude",
        type: "int256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "latitude",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "longitude",
        type: "int256",
      },
    ],
    name: "encodeCoordinates",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "eventCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "eventCountByUser",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "events",
    outputs: [
      {
        internalType: "uint256",
        name: "eventId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "regDeadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "arrivalTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isEnded",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "penalties",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "commitmentRequired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalCommitment",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "location",
        type: "bytes32",
      },
      {
        internalType: "enum IEventContract.ValidationMode",
        name: "validationMode",
        type: "uint8",
      },
      {
        internalType: "enum IEventContract.PenaltyMode",
        name: "penaltyMode",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "penaltyRequired",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getInvitedEvents",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "eventId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "regDeadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "arrivalTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isEnded",
            type: "bool",
          },
          {
            internalType: "address[]",
            name: "participantList",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "onTimeParticipants",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "penalties",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "commitmentRequired",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalCommitment",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "location",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "penaltyRequired",
            type: "uint256",
          },
        ],
        internalType: "struct IEventContract.EventView[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getPendingEvents",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "eventId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "regDeadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "arrivalTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isEnded",
            type: "bool",
          },
          {
            internalType: "address[]",
            name: "participantList",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "onTimeParticipants",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "penalties",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "commitmentRequired",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalCommitment",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "location",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "penaltyRequired",
            type: "uint256",
          },
        ],
        internalType: "struct IEventContract.EventView[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserClaimed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserContribution",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isEnded",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isAccepted",
        type: "bool",
      },
    ],
    name: "getUserEvents",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "eventId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "regDeadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "arrivalTime",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isEnded",
            type: "bool",
          },
          {
            internalType: "address[]",
            name: "participantList",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "onTimeParticipants",
            type: "address[]",
          },
          {
            internalType: "uint256",
            name: "penalties",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "commitmentRequired",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalCommitment",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "location",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "penaltyRequired",
            type: "uint256",
          },
        ],
        internalType: "struct IEventContract.EventView[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserJoinedEvents",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserLateCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserPenalties",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_eventId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_invitee",
        type: "address",
      },
    ],
    name: "inviteUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_eventId",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_invitees",
        type: "address[]",
      },
    ],
    name: "inviteUsers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "invitedEvents",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_eventIds",
        type: "uint256[]",
      },
    ],
    name: "isValidationReady",
    outputs: [
      {
        internalType: "bool[]",
        name: "",
        type: "bool[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "joinedEvents",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lateCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "mockValidation",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_eventId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_participant",
        type: "address",
      },
    ],
    name: "mockValidationTrue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userClaimableAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userTotalClaimed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userTotalContribution",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userTotalPenalties",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_eventId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_participant",
        type: "address",
      },
    ],
    name: "validateArrivalMock",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
