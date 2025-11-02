import Link from 'next/link';
import { Container } from './container';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* About */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-slate-900">About</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/about" className="hover:text-slate-900">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-slate-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Shop */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-slate-900">Shop</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/products" className="hover:text-slate-900">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="hover:text-slate-900">
                    Shopping Cart
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-slate-900">
                Customer Service
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/orders" className="hover:text-slate-900">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-slate-900">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-slate-900">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/privacy" className="hover:text-slate-900">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-slate-900">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 border-t border-slate-200 pt-8">
            <p className="text-center text-sm text-slate-600">
              © {new Date().getFullYear()} E-Shop. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
