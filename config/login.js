// see http://vuejs-templates.github.io/webpack for documentation.
let id = (process.argv.length > 3) ? process.argv[3] : 'janway'
const isProdServer = () => process.argv.indexOf('-prod') !== -1
const is2015Server = () => process.argv.indexOf('-2015') !== -1
const isLocalServer = () => process.argv.indexOf('-local') !== -1
const is141Server = () => process.argv.indexOf('-141') !== -1
const is201Server = () => process.argv.indexOf('-201') !== -1
const isNewFeature = () => process.argv.indexOf('-new_feature') !== -1

let prefix = ''

if (isProdServer() || is2015Server()) {
    prefix = '/login/thirdparty/13-f39' // 生產
} else if (isLocalServer()) {
    prefix = '/login/thirdparty/8-36d' // local 測試機 201 須改 .env 檔
} else if (isNewFeature()) {
    prefix = '/login/thirdparty/164-1c3' // 內測2
} else if (is201Server()) {
    prefix = '/login/thirdparty/164-1c3' // 內測1
} else {
    prefix = '/login/thirdparty/78-551' // 生產 && 141 外測
}

let target = ''
// 線上測試機 141
if (isLocalServer()) {
    target = 'http://localhost:8000' // local 測試機 200 201 須改 .env 檔
} else if (isProdServer()) {
    target = 'http://intlotteryclient.com' // 生產
} else if (is2015Server()) {
    target = 'http://landgameclient.com' // 2015
} else if (is141Server()) {
    target = 'http://gameclient.100scrop.tech' // 141 外測
} else if (is201Server()) {
    target = 'http://gameclient.b2bdev.com' // 201 內測1
} else if (isNewFeature()) {
    target = 'http://gcnew.b2bdev.com' // 201 內測2
}

const login = `${prefix}?thirdpartyUserId=${id}`

module.exports = {
    login,
    target
}

