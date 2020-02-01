import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import '@uni/uni-user-api/lib/index.css';

const Index = () => {
  const [dynamicComponent, setDynamicComponent] = useState();

  useEffect(() => {
    const dynamicLoad = async () => {
      const dynamicModule = await import('@uni/uni-user-api');
      setDynamicComponent(dynamicModule);
    };

    dynamicLoad().then();
  }, []);
  return (
    <div>
      {dynamicComponent && (
        <dynamicComponent.LoginModal
          locale="en" // 可不传，默认为 zh
          loginMethod="email" // 可不传，默认为 'phone'
          show={true}
          onCancel={() => {
            console.log('cancelled');
          }}
          onSuccess={() => {
            console.log('success');
          }}
          onPasswordReset={userInfo => {
            console.log('userInfo = ', userInfo);
          }}
        />
      )}
      {!dynamicComponent && <p>Hello Next js!</p>}
    </div>
  );
};

export default Index;
