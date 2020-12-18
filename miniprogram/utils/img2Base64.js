export default function({
  imgPath
}) {
  const FSM = wx.getFileSystemManager();
  const data = FSM.readFileSync(imgPath.tempFilePaths[0], 'base64')
  return data
}