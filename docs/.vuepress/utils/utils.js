/**
 * 读取文件夹生成list filePath 路径 ； type类型  dirName 文件夹名
 * @type {module:fs}
 */
const fs = require('fs');
const path = require('path');
function  fileDisplay(filePath,type,dirName){


    if(type===2) {filePath = filePath+'/'+dirName}
    var reg = RegExp(/\./)
    let files = fs.readdirSync(filePath);
    if(type===1){
        return files.filter(item=>!reg.test(item))
    }

    if(type===2){
        return files.filter(item=>reg.test(item)).map(item=>dirName+'/'+item.replace(/.md$/, ''));
    }

}
function getList(dir){

    const list =[{title: 'preface',path: 'preface'}];
    const dirList1 =  fileDisplay('./docs/'+dir,1);
    dirList1.forEach(item=>{list.push({title:item,sidebarDepth: 3,children:fileDisplay('./docs/'+dir,2,item)})})
    return list ;
}


module.exports.getList = getList;