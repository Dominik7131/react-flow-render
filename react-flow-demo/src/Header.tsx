import { useEffect } from 'react';
import { nodesDataState } from './atoms';
import { useRecoilState } from 'recoil';


const Header: React.FC = (): JSX.Element =>
{
    const [nodesData, setNodesData] = useRecoilState(nodesDataState)
    
    console.log("Button 'Print node names' re-rendered")

    const handlePrintNodeNames = () =>
    {
        for (let i = 0; i < nodesData.length; i++)
        {
            console.log(nodesData[i].label)
        }
    }

    const handleChangeNodeNames = () =>
    {
        console.log("Updating node names")
        setNodesData((nodesData: any[]) => nodesData.map(currentNodeData => 
        {
            const label = currentNodeData.data.label
            const newLabel = label + '.'
            const newData = { ...currentNodeData.data, label: newLabel }
            return { data: newData }
        }))
    }

    useEffect(() =>
    {
        console.log("Nodes data: ", nodesData)
    }, [nodesData]);

    return (
        <div>
            <button
                onClick={ handlePrintNodeNames }>
                Print node names
            </button>
            <button
                onClick={ handleChangeNodeNames }>
                Change node names
            </button>
        </div>
    )
}
    
export default Header