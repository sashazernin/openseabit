import './App.css';
import { useBuyNFTMutation, useGetListingsQuery } from './store/slices/listings';
import styles from './App.module.css'
import Input from './components/common/input/input';
import { ChangeEvent, ClipboardEvent } from 'react';
import { openseaSDK, walletWithProvider } from './helpers';
import { useUrlState } from './hooks/useUrlState';

function App() {
  const { value: slug, onChange: changeSlug } = useUrlState('slug')
  const { value: openSeaKey, onChange: changeOpenSeaKey } = useUrlState('openSeaKey')

  const handlePasteSlug = (e: ClipboardEvent<HTMLInputElement>) => {
    const value = e.clipboardData.getData('text')
    const valueMas = value.split('/')
    const parsedValue = valueMas[valueMas.length - 1]
    e.preventDefault()
    refetch()
    changeSlug(parsedValue)
  }

  const { data = [], refetch } = useGetListingsQuery({ collection_slug: slug ?? '', options: { limit: '10' } });
  const [buyNFT] = useBuyNFTMutation()

  const handleBuy = (item: any) => async () => {
    const resp = await buyNFT({ listing: { hash: item.order_hash, chain: item.chain }, fulfiller: { address: '0xEf6Dcb188e91E196F891d56102bECC179624E65D' } })
    const order = resp.data.fulfillment_data.orders[0]
    const accountAddress = await walletWithProvider.getAddress()
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
                    {/* <td>
                      <button onClick={handleBuy(item)}>Buy</button>
                    </td> */}
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
        {/* <div style={{ padding: '16px', display: 'flex', height: '40px' }}>
          <Input label='open sea key' value={openSeaKey} onChange={(e) => changeOpenSeaKey(e.target.value)}></Input>
        </div> */}
      </div>
    </div>
  );
}

export default App;
