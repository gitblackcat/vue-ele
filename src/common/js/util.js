//解析url参数
export function urlParse() {
    let url = window.location.search,
        obj = {},
        re = /[?&][^?&]+=[^?&]+/g,
        arr = url.match(re)

    if (arr.length) {
        arr.forEach(function (item) {
            let tempArr = item.substring(1).split('='),
                key = decodeURIComponent(tempArr[0]),
                value = decodeURIComponent(tempArr[1])

            obj[key] = value
        })
        return obj
    }
}
