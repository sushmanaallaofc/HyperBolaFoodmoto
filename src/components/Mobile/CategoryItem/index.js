import React, { Component } from 'react';

class CategoryItem extends Component {
    render() {
      const { label, active, onClick } = this.props;
      return (
        <div className="_1Wal2 _2J-1V">
          <div className={`tSHWz ${active ? 'selected' : ''}`} onClick={onClick}>
            <div className={`_2-Suu ${active ? '_3PukX' : ''}`}>
              <div className={`Ae6Jk ${label.length > 10 ? '_14HsX' : ''}`}>{label}</div>
            </div>
          </div>
        </div>
      );
    }
}

export default CategoryItem;
