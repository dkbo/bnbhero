/* eslint-disable */
/**
 * 去除重複項
 */
Array.prototype.unique = function() {
    return Array.from(new Set(this))
}

/**
 * 數字經度處理
 */
 Number.prototype.strip = function(d = 12) {
    return +parseFloat(this.toPrecision(d))
}