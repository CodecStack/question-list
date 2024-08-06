import tool from 'copy-paste'

Date.prototype.formatDate = function () {
    const year = this.getFullYear().toString().padStart(4, '0');
    const month = (this.getMonth() + 1).toString().padStart(2, '0');
    const day = this.getDate().toString().padStart(2, '0');
    const hour = this.getHours().toString().padStart(2, '0');
    const minute = this.getMinutes().toString().padStart(2, '0');
    const second = this.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
const date = new Date().formatDate()
tool.copy(date, () => console.log(`复制成功: ${date}`))