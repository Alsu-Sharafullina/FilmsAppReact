import React, { Component } from 'react';

class Bookmarks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 15,
            offset: 0,
            bookmarks : this.props.bookmarks,
            items : [],
        };
        this.onShowNextFilms = this.onShowNextFilms.bind(this);
        this.onBookmarksDel = this.onBookmarksDel.bind(this);
    }

    onShowNextFilms(){
        this.setState({
            limit : this.state.limit + 15,
        })
    }

    onBookmarksDel (event) {
        this.props.ClickStar(event);
    }

    render() {

        let bookmarksTitle = Object.keys(this.props.bookmarks);
        let bookmarks = bookmarksTitle.slice(this.state.offset, this.state.limit);

        return (

            <div>
                <div className="bookmarks__content">
                    {bookmarks.map((item, index) =>
                        <div className="bookmarks__item" key={index}>
                            <div className="bookmarks__name" key={index}>{this.props.bookmarks[item]}</div>
                            <div className="bookmarks__icon">
                                <img src="assets/img/star2.png" title={this.props.bookmarks[item]} onClick={this.onBookmarksDel} alt=""/>
                            </div>
                        </div>
                    )}
            </div>
            {this.state.limit <bookmarksTitle.length ? <div className="btn">
                <button onClick={this.onShowNextFilms}><a>Показать больше</a></button></div> : null}
            </div>
        )
    }
}

export default Bookmarks;