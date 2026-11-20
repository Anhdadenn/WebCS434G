import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { SearchBookingCard } from '../components/home/SearchBookingCard';
import { FleetSection } from '../components/home/FleetSection';
import { CommitmentSection } from '../components/home/CommitmentSection';

export const HomePage = () => {
  return (
    <main className="min-h-screen">
      {/* 1. Hero banner with title & trust badges */}
      <HeroSection />

      {/* 2. Floating interactive search & reservation card */}
      <SearchBookingCard />

      {/* 3. Fleet list with categories and bike cards */}
      <FleetSection />

      {/* 4. Customer commitments and guarantees */}
      <CommitmentSection />
    </main>
  );
};
