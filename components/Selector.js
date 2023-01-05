import React, { useEffect, useState, useContext } from 'react'

import { Dropdown } from '@nextui-org/react'
import { CoinMarketContext } from '../context/context'

const Selector = ({ defaultValue, ignoreValue, setToken, id }) => {
    const { coins } = useContext(CoinMarketContext)

      const menu = []
      for (let i = 0; i < coins.length; i++) {
        menu.push({key: coins[i].attributes.name, name: coins[i].attributes.name})
      }

  const DEFAULT_VALUE = 'Select a token'

  const [selectedItem, setSelectedItem] = useState()
  const [menuItems, setMenuItems] = useState(getFilteredItems(ignoreValue))

  function getFilteredItems(ignoreValue) {
    return menu.filter(item => item['key'] !== ignoreValue)
  }

  useEffect(() => {
    setSelectedItem(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    setMenuItems(getFilteredItems(ignoreValue))
  }, [ignoreValue])

  return (
    <Dropdown>
      <Dropdown.Button
        css={{
          backgroundColor:
            selectedItem === DEFAULT_VALUE ? '#2172e5' : '#2c2f36',
        }}
      >
        {selectedItem}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label='Dynamic Actions'
        items={menuItems}
        onAction={key => {
          setSelectedItem(key)
          setToken(key)
        }}
      >
        {item => (
          <Dropdown.Item
            aria-label={id}
            key={item.key}
            color={item.key === 'delete' ? 'error' : 'default'}
          >
            {item.name}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}
export default Selector
