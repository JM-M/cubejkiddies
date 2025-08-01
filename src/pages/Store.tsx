import { Route } from 'react-router-dom';
import { IonRouterOutlet, IonContent } from '@ionic/react';
import HomeCarousel from '../components/HomeCarousel';
import HomeProductSections from '../components/HomeProductSections';
import ProductSectionPage from './ProductSectionPage';
import Product from './Product';
import Category from './Category';
import Search from './Search';
import Checkout from './Checkout';
import Order from './Order';
import Footer from '../components/Footer';

const Store: React.FC = () => {
  return (
    <IonRouterOutlet>
      <IonContent className='store-content'>
        <div className='flex flex-col h-full'>
          <Route path='/:tab(store)/orders/:orderId' component={Order} />
          <Route path='/:tab(store)/category' component={Category} />
          <Route
            path='/:tab(store)/products/:productId'
            component={Product}
            exact
          />
          <Route
            path='/:tab(store)/search/:searchTerm'
            component={Search}
            exact
          />
          <Route path='/:tab(store)/checkout' component={Checkout} exact />
          <Route
            path='/:tab(store)/sections/:sectionId'
            component={ProductSectionPage}
            exact
          />
          <Route path='/:tab(store)' exact>
            <IonContent className='py-[50px]'>
              <div className='flex flex-col min-h-screen'>
                <HomeCarousel />
                <HomeProductSections />
              </div>
              <Footer />
            </IonContent>
          </Route>
        </div>
      </IonContent>
    </IonRouterOutlet>
  );
};

export default Store;
