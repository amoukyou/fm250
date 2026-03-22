import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import BankPage from './pages/BankPage'
import CategoryPage from './pages/CategoryPage'
import MultipleChoicePage from './pages/MultipleChoicePage'
import QAPage from './pages/QAPage'
import RandomPracticePage from './pages/RandomPracticePage'
import CategoryWrongPage from './pages/CategoryWrongPage'
import CategoryFavsPage from './pages/CategoryFavsPage'
import MockExamPage from './pages/MockExamPage'
import MockResultPage from './pages/MockResultPage'
import PracticeResultPage from './pages/PracticeResultPage'
import WrongAnswersPage from './pages/WrongAnswersPage'
import FavoritesPage from './pages/FavoritesPage'
import StatsPage from './pages/StatsPage'
import SearchPage from './pages/SearchPage'
import { lazy, Suspense } from 'react'
const ManualPage = lazy(() => import('./pages/ManualPage'))

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bank/:bankId" element={<BankPage />} />
        <Route path="/bank/:bankId/category/:categoryId" element={<CategoryPage />} />
        <Route path="/bank/:bankId/category/:categoryId/mc" element={<MultipleChoicePage />} />
        <Route path="/bank/:bankId/category/:categoryId/qa" element={<QAPage />} />
        <Route path="/bank/:bankId/category/:categoryId/random" element={<RandomPracticePage />} />
        <Route path="/bank/:bankId/category/:categoryId/wrong" element={<CategoryWrongPage />} />
        <Route path="/bank/:bankId/category/:categoryId/favs" element={<CategoryFavsPage />} />
        <Route path="/mock-exam" element={<MockExamPage />} />
        <Route path="/mock-result" element={<MockResultPage />} />
        <Route path="/practice-result" element={<PracticeResultPage />} />
        <Route path="/wrong" element={<WrongAnswersPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/manual" element={<Suspense fallback={<div className="text-center py-10 text-gray-400">載入中...</div>}><ManualPage /></Suspense>} />
      </Routes>
    </Layout>
  )
}
