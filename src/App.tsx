import './App.css';
import { useBuyNFTMutation, useGetListingsQuery } from './store/slices/listings';
import styles from './App.module.css'
import Input from './components/common/input/input';
import { ClipboardEvent } from 'react';
import { useUrlState } from './hooks/useUrlState';
import { useCheck1Mutation, useCheck2Mutation } from './store/slices/grapthQl';
import { useOpenSeaSDK } from './hooks/useOpenSeaSDK';
import { OrderSide } from 'opensea-js';

function App() {
  const { value: slug, onChange: changeSlug } = useUrlState('slug')
  const { value: openSeaKey, onChange: changeOpenSeaKey } = useUrlState('openSeaKey')

  const { openseaSDK, signer } = useOpenSeaSDK()

  const handlePasteSlug = (e: ClipboardEvent<HTMLInputElement>) => {
    const value = e.clipboardData.getData('text')
    const valueMas = value.split('/')
    const parsedValue = valueMas[valueMas.length - 1]
    e.preventDefault()
    refetch()
    changeSlug(parsedValue)
  }

  const { data = [], refetch } = useGetListingsQuery({ collection_slug: slug ?? '', options: { limit: '10' } });

  const [check1] = useCheck1Mutation()
  const [check2] = useCheck2Mutation()

  const handleBuy = (item: any) => async () => {
    if (!openseaSDK || !signer) return
    const order = await openseaSDK.api.getOrder({ side: OrderSide.LISTING })
    const accountAddress = await signer.getAddress()
    const transactionHash = await openseaSDK.fulfillOrder({ order, accountAddress })
  }

  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <div style={{ width: 'min-content', paddingTop: '20px' }}>
        <div>
          <table style={{ minHeight: '528px' }}>
            <thead>
              <tr>
                <td>
                  №
                </td>
                <td >
                  price
                </td>
                <td>
                  currency
                </td>
                <td>
                  NFT link
                </td>
                {/* <td>
                  Btn
                </td> */}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index} className={styles.tableBodyTr}>
                    <td>
                      {index + 1}
                    </td>
                    <td>
                      {item.price.current.value}
                    </td>
                    <td>
                      {item.price.current.currency}
                    </td>
                    <td>
                      <a target='_blank' href={`https://opensea.io/item/base/${item.protocol_data.parameters.offer[0].token}/${item.protocol_data.parameters.offer[0].identifierOrCriteria}`}>
                        link
                      </a>
                    </td>
                    <td>
                      <button onClick={handleBuy(item)}>Buy</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '16px', display: 'flex', justifyContent: 'start' }}>
          <button style={{ padding: '10px 20px', cursor: 'pointer', fontSize: '16px' }} onClick={refetch}>refetch</button>
          <div style={{ flex: 1 }}></div>
          <Input label='collection_slug' value={slug} onChange={(e) => changeSlug(e.target.value)} onPaste={handlePasteSlug}></Input>
        </div>
        <div style={{ padding: '16px', display: 'flex', height: '40px' }}>
          <Input label='open sea key' value={openSeaKey} onChange={(e) => changeOpenSeaKey(e.target.value)}></Input>
        </div>
      </div>
    </div>
  );
}

export default App;
