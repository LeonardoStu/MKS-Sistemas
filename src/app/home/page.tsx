import Footer from "@/components/footer";
import Header from "@/components/header";
import Products from "@/components/products";
import style from './page.module.scss'

export default function Home() {
  return<>
    <div className={style.pageContainer}>
      <Header />
      <div className={style.content}>
        <Products />
      </div>
      <Footer />
    </div>
  </>
}
