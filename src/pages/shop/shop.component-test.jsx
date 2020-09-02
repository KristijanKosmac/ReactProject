import React from "react";
import SHOP_DATA from "./shop.data";
import ComponentPreview from "../../components/collection-preview.component/collection-preview";

class ShopPageTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: SHOP_DATA,
    };
  }

  render() {
    const { collections } = this.state;
    return (
      <div className="shop-page">
        {collections
          .filter(
            (collection) => collection.routeName == this.props.match.params.id
          )
          .map(({ id, items, routeName }) => (
            <ComponentPreview key={id} items={items}></ComponentPreview>
          ))}
      </div>
    );
  }
}

export default ShopPageTest;
