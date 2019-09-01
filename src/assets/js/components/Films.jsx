import React, { Component } from 'react';

class Films extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 15,
            offset: 0,
            bookmarks : this.props.bookmarks,
            items : [],
        };
        this.onShowNextFilms = this.onShowNextFilms.bind(this);
        this.onBookmarksAdd = this.onBookmarksAdd.bind(this);
    }

    onShowNextFilms(){
        this.setState({
            limit : this.state.limit + 15,
        })
    }

    onBookmarksAdd(event) {
        this.props.ClickStar(event);
    }

    render() {

        let films = this.props.items.slice(this.state.offset, this.state.limit);

        return (

            <div>
            <div className="films__content">
                {films.map((item, index) =>
                    <div className="film__item" key={index}>
                        <div className="film__name" key={index}>{item.title}</div>
                        <div className="film__icon">
                            {this.state.bookmarks[item.title] ?
                                <img src="assets/img/star2.png" title={item.title} onClick={this.onBookmarksAdd} alt=""/> :
                                <img src="assets/img/star.png" title={item.title} onClick={this.onBookmarksAdd} alt="" />}
                        </div>
                    </div>
                )}
            </div>
            {this.state.limit < this.props.items.length ? <div className="btn">
                <button onClick={this.onShowNextFilms}><a>Показать больше</a></button></div> : null}
            </div>
        )
    }
}

export default Films;