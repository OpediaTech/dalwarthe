import Layout from '@components/layout/layout';
import OrderTable from '@components/order/order-table';
import { useOrdersQuery } from '@framework/order/get-all-orders';
import { useState } from 'react';

export default function OrdersTablePage() {
  const { data, isLoading } = useOrdersQuery({});
  const [OrderData, setOrderData] = useState([]);
  return (
    <div className="pt-4">
      {!isLoading ? <OrderTable orders={OrderData} /> : <div>Loading...</div>}
      {/* {!isLoading ? <OrderTable orders={data?.data} /> : <div>Loading...</div>} */}
    </div>
  );
}

OrdersTablePage.Layout = Layout;
