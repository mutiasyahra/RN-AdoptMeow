import React, { createContext, useContext, useState } from "react";

// Tipe data kucing agar konsisten
type Cat = {
  id: string;
  name: string;
  age: string;
  emoji?: string;
  color?: string;
  desc?: string;
  image?: any;
};

type AdoptionContextType = {
  adoptedCats: Cat[];
  adoptCat: (cat: Cat) => void;
  removeCat: (id: string) => void;
};

const AdoptionContext = createContext<AdoptionContextType | undefined>(
  undefined
);

export const AdoptionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [adoptedCats, setAdoptedCats] = useState<Cat[]>([]);

  const adoptCat = (cat: Cat) => {
    // Menambahkan kucing ke daftar paling atas
    setAdoptedCats((prev) => [cat, ...prev]);
  };

  const removeCat = (id: string) => {
    setAdoptedCats((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <AdoptionContext.Provider value={{ adoptedCats, adoptCat, removeCat }}>
      {children}
    </AdoptionContext.Provider>
  );
};

export const useAdoption = () => {
  const context = useContext(AdoptionContext);
  if (!context)
    throw new Error("useAdoption must be used within AdoptionProvider");
  return context;
};
