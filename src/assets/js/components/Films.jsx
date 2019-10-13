import React, { Component } from 'react';

class Films extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 10,
            offset: 0,
            bookmarks : this.props.bookmarks,
            items : [],
        };
        this.onShowNextFilms = this.onShowNextFilms.bind(this);
        this.onBookmarksAdd = this.onBookmarksAdd.bind(this);
    }

    onShowNextFilms(){
        this.setState({
            limit : this.state.limit + 10,
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
                        <div className="film__name"><a className="film__link" href="" data-film-id={item.title} onClick={this.props.setFilm}>{item.title}</a></div>
                        <div className="film__tags">{item.tags.map((tag, tag_index)=>
                            <span key={tag_index} className={this.props.current_tags[tag] == true ? "tag__name active" : "tag__name"}
                                  name={tag} onClick={this.props.onFilterTags}>#{tag}</span>
                        )}</div>
                        <div className="film__icon">
                            {this.state.bookmarks[item.title] ?
                                <img className="bookmark__icon" src="assets/img/bookmark2.svg" title={item.title} onClick={this.onBookmarksAdd} alt=""/> :
                                <img className="unbookmark__icon" src="assets/img/bookmark1.svg" title={item.title} onClick={this.onBookmarksAdd} alt="" />}
                        </div>
                    </div>
                )}
            </div>
            {this.state.limit < this.props.items.length ? <div className="btn">
                <button className="films__button" onClick={this.onShowNextFilms}><a>Показать больше</a></button></div> : null}
            </div>
        )
    }
}

export default Films;