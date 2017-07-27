/*  post 下载文件
**  @params url 暂时 只传 下载地址
*/

const DownLoadFile = (url)=>{
    const config = {
        method : 'post',
    };
    // const iframe = '<iframe id=`down-file-iframe${}`></iframe>'
    let iframe = document.createElement('iframe');
    iframe.id = `down-file-iframe${new Date().toTimeString}`;
    iframe.method = config.method;
    iframe.action = url;
    iframe.submit();
}