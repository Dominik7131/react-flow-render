import { RecoilRoot } from 'recoil'
import Flow from './Flow'
import Header from './Header'


function App()
{
  return (
    <RecoilRoot>

      <Header />

      <Flow />

    </RecoilRoot>
  )
}

export default App