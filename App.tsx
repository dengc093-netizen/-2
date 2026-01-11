
import React, { useState, useCallback } from 'react';
import { View, Pet } from './types';
import HomeView from './components/HomeView';
import PetDetailView from './components/PetDetailView';
import ApplicationForm from './components/ApplicationForm';
import ProfileView from './components/ProfileView';
import BottomNav from './components/BottomNav';
import FavoritesView from './components/FavoritesView';
import MessagesView from './components/MessagesView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const navigateToDetail = useCallback((pet: Pet) => {
    setSelectedPet(pet);
    setCurrentView(View.DETAIL);
  }, []);

  const navigateBack = useCallback(() => {
    setCurrentView(View.HOME);
    setSelectedPet(null);
  }, []);

  const startAdoption = useCallback(() => {
    setCurrentView(View.FORM);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <HomeView onPetSelect={navigateToDetail} />;
      case View.DETAIL:
        return selectedPet ? (
          <PetDetailView 
            pet={selectedPet} 
            onBack={navigateBack} 
            onApply={startAdoption}
          />
        ) : null;
      case View.FORM:
        return <ApplicationForm onBack={() => setCurrentView(View.DETAIL)} />;
      case View.PROFILE:
        return <ProfileView />;
      case View.MESSAGES:
        return <MessagesView />;
      case View.FAVORITES:
        return <FavoritesView onPetSelect={navigateToDetail} />;
      default:
        return <HomeView onPetSelect={navigateToDetail} />;
    }
  };

  return (
    <div className="max-w-[430px] mx-auto min-h-screen relative shadow-2xl overflow-x-hidden flex flex-col bg-background-light dark:bg-background-dark">
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {renderView()}
      </main>
      
      {/* Conditionally show bottom nav */}
      {(currentView === View.HOME || currentView === View.PROFILE || currentView === View.MESSAGES || currentView === View.FAVORITES) && (
        <BottomNav activeView={currentView} onViewChange={setCurrentView} />
      )}
    </div>
  );
};

export default App;
