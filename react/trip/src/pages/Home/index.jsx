import useTitle from '@/hooks/useTitle';
import { useEffect } from 'react';
import {Button} from 'react-vant'
import {showToast} from '@/components/Toast/toastController'
const Home = () => {
  useTitle('首页')
  return (
    <div>
      <Button type='primary'
         onClick={() => {showToast({user: 10, bell: 20, mail: 30})}}
        >
          showToast
          </Button>
    </div>
  );
};
export default Home;