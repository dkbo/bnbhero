const abi = [
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !1,
                internalType: 'address',
                name: 'seller',
                type: 'address'
            },
            {
                indexed: !1,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            }
        ],
        name: 'CancelledListing',
        type: 'event'
    },
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !1,
                internalType: 'address',
                name: 'seller',
                type: 'address'
            },
            {
                indexed: !1,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
            {
                indexed: !1,
                internalType: 'uint256',
                name: 'bnbPrice',
                type: 'uint256'
            },
            {
                indexed: !1,
                internalType: 'uint256',
                name: 'bnbhPrice',
                type: 'uint256'
            }
        ],
        name: 'ListingPriceChange',
        type: 'event'
    },
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !1,
                internalType: 'address',
                name: 'seller',
                type: 'address'
            },
            {
                indexed: !1,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
            {
                indexed: !1,
                internalType: 'uint256',
                name: 'bnbPrice',
                type: 'uint256'
            },
            {
                indexed: !1,
                internalType: 'uint256',
                name: 'bnbhPrice',
                type: 'uint256'
            }
        ],
        name: 'NewListing',
        type: 'event'
    },
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !1,
                internalType: 'address',
                name: 'buyer',
                type: 'address'
            },
            {
                indexed: !1,
                internalType: 'address',
                name: 'seller',
                type: 'address'
            },
            {
                indexed: !1,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
            {
                indexed: !1,
                internalType: 'uint256',
                name: 'bnbPrice',
                type: 'uint256'
            },
            {
                indexed: !1,
                internalType: 'uint256',
                name: 'bnbhPrice',
                type: 'uint256'
            },
            {
                indexed: !1,
                internalType: 'uint256',
                name: 'tax',
                type: 'uint256'
            }
        ],
        name: 'PurchaseListing',
        type: 'event'
    },
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !0,
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32'
            },
            {
                indexed: !0,
                internalType: 'bytes32',
                name: 'previousAdminRole',
                type: 'bytes32'
            },
            {
                indexed: !0,
                internalType: 'bytes32',
                name: 'newAdminRole',
                type: 'bytes32'
            }
        ],
        name: 'RoleAdminChanged',
        type: 'event'
    },
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !0,
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32'
            },
            {
                indexed: !0,
                internalType: 'address',
                name: 'account',
                type: 'address'
            },
            {
                indexed: !0,
                internalType: 'address',
                name: 'sender',
                type: 'address'
            }
        ],
        name: 'RoleGranted',
        type: 'event'
    },
    {
        anonymous: !1,
        inputs: [
            {
                indexed: !0,
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32'
            },
            {
                indexed: !0,
                internalType: 'address',
                name: 'account',
                type: 'address'
            },
            {
                indexed: !0,
                internalType: 'address',
                name: 'sender',
                type: 'address'
            }
        ],
        name: 'RoleRevoked',
        type: 'event'
    },
    {
        inputs: [],
        name: 'DEFAULT_ADMIN_ROLE',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        name: 'bannedList',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'bnbhToken',
        outputs: [
            {
                internalType: 'contract IBEP20',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'characters',
        outputs: [
            {
                internalType: 'contract IBNBHCharacter',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        name: 'excludeFromTax',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32'
            }
        ],
        name: 'getRoleAdmin',
        outputs: [
            {
                internalType: 'bytes32',
                name: '',
                type: 'bytes32'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32'
            },
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'grantRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32'
            },
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'hasRole',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        name: 'lastTransferredTimes',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'maintenanceMode',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'minimumPrice',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'name',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'priceOracle',
        outputs: [
            {
                internalType: 'contract IPriceOracle',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32'
            },
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'renounceRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'bytes32',
                name: 'role',
                type: 'bytes32'
            },
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'revokeRole',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'bytes4',
                name: 'interfaceId',
                type: 'bytes4'
            }
        ],
        name: 'supportsInterface',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'taxFee',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'taxFeeRecepient',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'contract IBEP20',
                name: '_bnbhToken',
                type: 'address'
            },
            {
                internalType: 'contract IBNBHCharacter',
                name: '_characters',
                type: 'address'
            }
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'migrateExcludeFromTax',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256[]',
                name: 'tokenIds',
                type: 'uint256[]'
            }
        ],
        name: 'removeBannedHeores',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'token',
                type: 'address'
            }
        ],
        name: 'setTokenAddress',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'character',
                type: 'address'
            }
        ],
        name: 'setCharacterAddress',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'bool',
                name: 'mode',
                type: 'bool'
            }
        ],
        name: 'setmaintenanceMode',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'fee',
                type: 'uint256'
            }
        ],
        name: 'setTaxFee',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            }
        ],
        name: 'setTaxFeeRecepient',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'oracle',
                type: 'address'
            }
        ],
        name: 'setPriceOracle',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
            }
        ],
        name: 'setMinimumPrice',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address'
            },
            {
                internalType: 'bool',
                name: 'state',
                type: 'bool'
            }
        ],
        name: 'setBannedAccount',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_limit',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: '_pageNumber',
                type: 'uint256'
            }
        ],
        name: 'getCharacterListingIDsPage',
        outputs: [
            {
                internalType: 'uint256[]',
                name: '',
                type: 'uint256[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_limit',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: '_pageNumber',
                type: 'uint256'
            }
        ],
        name: 'getCharactersForPage',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'name',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'heroType',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'xp',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'attack',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'armor',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'speed',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'hp',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256'
                    },
                    {
                        internalType: 'address',
                        name: 'seller',
                        type: 'address'
                    },
                    {
                        internalType: 'uint256',
                        name: 'price',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'level',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'heroClass',
                        type: 'uint256'
                    }
                ],
                internalType: 'struct BNBHMarket.MarketHero[]',
                name: '',
                type: 'tuple[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getAllTokenIds',
        outputs: [
            {
                internalType: 'uint256[]',
                name: '',
                type: 'uint256[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'seller',
                type: 'address'
            }
        ],
        name: 'getCharactersForSeller',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'name',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'heroType',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'xp',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'attack',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'armor',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'speed',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'hp',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256'
                    },
                    {
                        internalType: 'address',
                        name: 'seller',
                        type: 'address'
                    },
                    {
                        internalType: 'uint256',
                        name: 'price',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'level',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'heroClass',
                        type: 'uint256'
                    }
                ],
                internalType: 'struct BNBHMarket.MarketHero[]',
                name: '',
                type: 'tuple[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_heroId',
                type: 'uint256'
            }
        ],
        name: 'getCharacterDataById',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'name',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'heroType',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'xp',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'attack',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'armor',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'speed',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'hp',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256'
                    },
                    {
                        internalType: 'address',
                        name: 'seller',
                        type: 'address'
                    },
                    {
                        internalType: 'uint256',
                        name: 'price',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'level',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'heroClass',
                        type: 'uint256'
                    }
                ],
                internalType: 'struct BNBHMarket.MarketHero',
                name: '',
                type: 'tuple'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256[]',
                name: 'tokenIds',
                type: 'uint256[]'
            }
        ],
        name: 'getCharacterDataByIds',
        outputs: [
            {
                components: [
                    {
                        internalType: 'uint256',
                        name: 'name',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'heroType',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'xp',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'attack',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'armor',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'speed',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'hp',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256'
                    },
                    {
                        internalType: 'address',
                        name: 'seller',
                        type: 'address'
                    },
                    {
                        internalType: 'uint256',
                        name: 'price',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'level',
                        type: 'uint256'
                    },
                    {
                        internalType: 'uint256',
                        name: 'heroClass',
                        type: 'uint256'
                    }
                ],
                internalType: 'struct BNBHMarket.MarketHero[]',
                name: '',
                type: 'tuple[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_tokenId',
                type: 'uint256'
            }
        ],
        name: 'getSellerOfNftID',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_seller',
                type: 'address'
            }
        ],
        name: 'getNumberOfListingsBySeller',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_seller',
                type: 'address'
            }
        ],
        name: 'getListingIDsBySeller',
        outputs: [
            {
                internalType: 'uint256[]',
                name: 'tokens',
                type: 'uint256[]'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getNumberOfCharacterListings',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_heroId',
                type: 'uint256'
            }
        ],
        name: 'canListOrChangePrice',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_id',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: '_price',
                type: 'uint256'
            }
        ],
        name: 'addListing',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_id',
                type: 'uint256'
            },
            {
                internalType: 'uint256',
                name: '_newPrice',
                type: 'uint256'
            }
        ],
        name: 'changeListingPrice',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_id',
                type: 'uint256'
            }
        ],
        name: 'cancelListing',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_id',
                type: 'uint256'
            }
        ],
        name: 'purchaseListing',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address'
            },
            {
                internalType: 'address',
                name: '',
                type: 'address'
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256'
            },
            {
                internalType: 'bytes',
                name: '',
                type: 'bytes'
            }
        ],
        name: 'onERC721Received',
        outputs: [
            {
                internalType: 'bytes4',
                name: '',
                type: 'bytes4'
            }
        ],
        stateMutability: 'view',
        type: 'function'
    }
]
export default abi