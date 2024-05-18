import { Node, Edge }  from 'reactflow';


interface Props
{
  nodes: Node[]
}

const Header: React.FC<Props> = ({ nodes }): JSX.Element =>
{
    console.log("Button 'Print node names' re-rendered")

    const handlePrintNodeNames = () =>
    {
        for (let i = 0; i < nodes.length; i++)
        {
            console.log(nodes[i].data.label)
        }
    }

    return <div>
        <button
            onClick={ handlePrintNodeNames }>
            Print node names
        </button>
    </div>
}
    
export default Header