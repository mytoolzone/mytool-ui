// 加载css
export function loadCss(url) {
  const temp = document.createElement('link')
  temp.rel = 'stylesheet'
  temp.type = 'text/css'
  temp.href = url
  document.getElementsByTagName('head')[0].appendChild(temp)
}
// 卸载css
export function removeCss(url) {
  const links = document.getElementsByTagName('link')
  for (let index = 0; index < links.length; index++) {
    console.log(links[index].href, url, links[index].href.includes(url))
    if (links[index].href.includes(url)) {
      links[index].parentNode.removeChild(links[index])
      break
    }
  }
}
// 设置全局灰度
export function settingGrayscale() {
  loadCss('/public/css/grayscale.css')
}
// 清除全局灰度
export function clearGrayscale() {
  removeCss('/public/css/grayscale.css')
}
