import { Component } from 'react';
import { Circles } from 'react-loader-spinner';
import { SearchBar } from './SearchBar/SearchBar';
import { getImagesViaApi } from './services/api';
import { ImageGalleryList } from './ImageGallery/ImageGalleryList/ImageGalleryList';
import { LoadMore } from './LoadMore/LoadMore';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    hits: null,
    totalHits: null,
  };

  async componentDidUpdate(_, prevState) {
    if (!this.state.isLoading) {
      return;
    }
    try {
      const images = await getImagesViaApi({
        query: this.state.query,
        page: this.state.page,
      });
      if (
        prevState.query !== this.state.query ||
        this.state.page !== prevState.page
      ) {
        this.setState({
          images: [...this.state.images, ...images.hits],
          isLoading: false,
          hits: images.total,
        totalHits: images.totalHits,
        });
      }
    } catch (error) {
      console.log('error');
    } finally {
      this.setState({ isLoading: false });
    }
  }
  onSearchSubmit = query => {
    this.setState({ page: 1, query, images: [], isLoading: true });
  };
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true  }));
  };

  render() {
    const { hits, totalHits, images, isLoading } = this.state;
    return (
      <div className="app">
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageGalleryList images={images} />

        {isLoading && (
          <Circles
            height="80"
            width="80"
            color="red"
            ariaLabel="circles-loading"
            visible={true}
            wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
          />
        )}
        {hits >= 12 && images.length !== totalHits && !isLoading && (
          <LoadMore onClick={this.loadMore} />
        )}
      </div>
    );
  }
}