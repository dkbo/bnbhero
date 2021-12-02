import base64 from 'hi-base64'
import enemies from './enemies.js'
// import router from '@/router'

/**
 * base 64 編碼
 * @param {string} str 要編碼的字串
 */
export const b64EncodeUnicode = str => base64.encode(str)

/**
 * base 64 Bytes 編碼
 * @param {string} arr 要編碼的字串
 */
export const b64EncodeUnicodeBytes = arr => b64EncodeUnicode(new Uint8Array(arr))

/**
 * base 64 解碼
 * @param {string} str 要解碼的字串
 */
export const b64DecodeUnicode = str => base64.decode(str)

/**
 * base 64 Bytes 解碼
 * @param {string} str 要解碼的字串
 */
export const b64DecodeUnicodeBytes = str => base64.decode.bytes(str)
/**
 * 取得 Cookie
 * @param {string} cname Cookie Name
 */
export const getCookie = (cname) => {
    let name = cname + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}
/**
 * 判斷是否為 json 格式
 * true 轉換成 javascript 可用的格式
 * false 返回空字串
 * @param {string} string json 字串
 */
export const handleJson = (string) => {
    try {
        return JSON.parse(string)
    } catch (error) {
        return ''
    }
}
/**
 * 設定 localStorage
 * true 返回 localStorage 並進行 json 檢測
 * false 返回空字串
 * @param {string} key localStorage 的 Key
 * @param {string} data 資料
 * @param {boolean} isJson 是否 Json
 */
export const setStorage = (key, data, isJson = true) => {
    if (isJson) {
        localStorage[b64EncodeUnicode(key)] = b64EncodeUnicode(JSON.stringify(data))
        return
    }
    localStorage[b64EncodeUnicode(key)] = b64EncodeUnicode(data)
}

/**
 * 取得 localStorage 並判斷有無
 * true 返回 localStorage 並進行 json 檢測
 * false 返回空字串
 * @param {string} key localStorage 的 Key
 * @param {boolean} isJson 是否 Json
 */
export const getStorage = (key, isJson = true) => {
    const storage = localStorage[b64EncodeUnicode(key)]
    if (storage) {
        try {
            const unCode = b64DecodeUnicode(storage)
            if (isJson) {
                return handleJson(unCode)
            }
            return unCode
        } catch (err) {
            return ''
        }
    }
    return ''
}

/**
 * 深複製
 * @param {any} state 要複製的資料
 */
export const returnState = data => JSON.parse(JSON.stringify(data))

/******************* 計算公式 *******************/
const getAttr = v => +v === 2
    ? 30
    : +v === 3
        ? 60
        : +v === 4
            ? 140
            : 0
const getReward = v => +v === 2
    ? 3
    : +v === 3
        ? 6
        : +v === 4
            ? 16
            : 0

const getDishp = v => +v === 2
    ? -5
    : +v === 3
        ? -13
        : +v === 4
            ? -28
            : 0

const getExp = v => +v === 2
    ? 30
    : +v === 3
        ? 60
        : +v === 4
            ? 90
            : 0

export const calc = ({ card, build, gas }) => {
    const [lv, atk, def, agi] = card
    const [b1, b2, b3, b4] = build
    const attr = getAttr(b1)
    const reward = getReward(b2)
    const dishp = getDishp(b3)
    const exp = getExp(b4)
    const vatk = (lv - 1) * 10 + atk + attr
    const vdef = (lv - 1) * 10 + def + attr
    const vagi = (lv - 1) * 10 + agi + attr
    const hpcd = 86400 / 1000 * (100 + dishp) / 100
    const everyDayHp = (86400 / hpcd).strip(4)
    return {
        buildData: {
            attr,
            reward,
            exp,
            dishp
        },

        cardData: {
            vatk,
            vdef,
            vagi,
            hpcd,
            everyDayHp
        }
    }
}

export const calcEnemies = ({ cardData, buildData, gas }) => {
    const {vatk, vdef, vagi, everyDayHp} = cardData
    const {reward: buildReward, exp: buildExp} = buildData

    return enemies.map((data) => {
        const {name, success, hploss, exp, reward: enemiesReward} = data
        // 總成功率
        const successC = success + (vatk / 100)
        // Valult加成獎勵
        const valultReward = enemiesReward * (100 + buildReward) / 100
        // 速度加成獎勵
        const speedReward = vagi * valultReward / 2000
        // 總獎金
        const rewardC = valultReward + speedReward
        // 戰鬥成功扣血量
        const hplossC = Math.ceil(hploss - vdef / 30)
        // 每天計算次數
        const everyHit = everyDayHp / (((100 - successC) * hploss + successC * hplossC) / 100)
        // 單次期望經驗
        const oneHitExp = successC / 100 * (exp + buildExp)
        // 期望每天經驗
        const everyXp = Math.ceil(everyHit * oneHitExp)
        // 單次期望獎金
        const oneHitReward = successC / 100 * rewardC - gas
        // 期望每天獎金
        const everyRewrad = (everyHit * oneHitReward).strip(4)
        return {
            name,
            successC,
            rewardC: rewardC.strip(8),
            hplossC,
            everyXp,
            everyRewrad
        }
    })
}