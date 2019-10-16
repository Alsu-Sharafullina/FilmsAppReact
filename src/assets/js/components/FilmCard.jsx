import React, {Component} from 'react';

class FilmCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <React.Fragment>

                <div className="film__card">
                    <div className="film__reset__link" onClick={this.props.reset}>
                        <img className="arrow__img" src="assets/img/left-arrow-button.svg" alt=""/>
                        <a className="reset__link" href="">Назад</a>
                    </div>
                    <div className="current_film_item">
                        <div className="film__img"></div>
                        <div className="film__info">
                            <div className="current_film_title">{this.props.film.title}</div>
                            {this.props.bookmarks[this.props.film.title] ?
                                <button onClick={this.props.delBookmark} className="deleteBookmarks"
                                        title={this.props.film.title}>Удалить с закладок</button> :
                                <button className="addBookmarks" title={this.props.film.title}
                                        onClick={this.props.addedBookmark}>Добавить в закладки</button>}
                        </div>
                    </div>
                </div>

            </React.Fragment>

        )
    }

}

export default FilmCard;