import React from 'react'

const CanvasMenu = (props) => {
    const { graph, contextmenu } = React.useContext(GraphinContext);
  const context = contextmenu.canvas;
  const handleDownload = () => {
    graph.downloadFullImage('canvas-contextmenu');
    context.handleClose();
  };
  const handleClear = () => {
    message.info(`清除画布成功`);
    context.handleClose();
  };
  const handleStopLayout = () => {
    message.info(`停止布局成功`);
    context.handleClose();
  };
  const handleOpenFishEye = () => {
    props.handleOpenFishEye();
  };
  return (
    <Menu bindType="canvas">
      <Menu.Item onClick={handleOpenFishEye}>OPEN FISH EYE</Menu.Item>
      <Menu.Item onClick={handleClear}>DELET</Menu.Item>
      <Menu.Item onClick={handleStopLayout}>STOP LAYOUT</Menu.Item>
      <Menu.Item onClick={handleDownload}>DOWNLOAD</Menu.Item>
    </Menu>
  );
}

export default CanvasMenu
