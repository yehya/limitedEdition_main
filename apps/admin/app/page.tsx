import Link from 'next/link';

export default function AdminHome() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Limited Edition Admin</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/orders">
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg hover:border-yellow-500 transition-colors cursor-pointer">
              <h2 className="text-2xl font-semibold mb-2">Orders</h2>
              <p className="text-gray-400">Manage and view customer orders</p>
            </div>
          </Link>
          
          <Link href="/admin/products">
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-lg hover:border-yellow-500 transition-colors cursor-pointer">
              <h2 className="text-2xl font-semibold mb-2">Products</h2>
              <p className="text-gray-400">Manage product inventory and pricing</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
