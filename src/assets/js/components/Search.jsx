import  React, {Component} from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (

            <React.Fragment>

                <div className="search">
                    <div className="container">
                        <div className="search__inner">
                            <form action="#" className="search__form" onSubmit={this.props.change}>
                                <input type="search" id="searchTxt" className="form-control" placeholder="Поиск"/>
                                <button type="submit" className="search__item">
                                    <img className="search__icon" src="assets/img/search__icon.svg" alt=""/>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )

    }
}

export default Search;