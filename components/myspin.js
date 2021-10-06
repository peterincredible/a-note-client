import {Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function MySpin(){
    const antIcon = <LoadingOutlined style={{ fontSize: 36,color:"#e91e63"}} spin />
    return (
        <div className="spin_container">
            <Spin size="large" indicator={antIcon} />
        </div>
    )
}

export default MySpin;