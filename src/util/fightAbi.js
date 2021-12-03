const abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'implementation',
                type: 'address'
            }
        ],
        name: 'Upgraded',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            {
                type: 'address',
                name: 'player'
            },
            {
                type: 'uint256',
                name: 'hero'
            },
            {
                type: 'uint256',
                name: 'enemyType'
            },
            {
                type: 'uint256',
                name: 'rewards'
            },
            {
                type: 'uint256',
                name: 'exp'
            },
            {
                type: 'uint256',
                name: 'hpLoss'
            }
        ],
        name: 'Fight',
        type: 'event'
    },
    { stateMutability: 'payable', type: 'receive' }
]
export default abi
