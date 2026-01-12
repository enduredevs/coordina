"use client";

import type { TimeFormat } from "@coordina/database";
import React from "react";
import { useLocalStorage } from "react-use";
import { z } from "zod";
import { useRequiredContext } from "@/components/use-required-context";
import { useUser } from "@/components/user-provider";

type Preferences = {
  timeZone?: string;
  timeFormat?: TimeFormat;
  weekStart?: number;
};

const timeFormatSchema = z.enum(["hours12", "hours24"]);

const preferenceSchema = z.object({
  timeZone: z.string().optional(),
  timeFormat: timeFormatSchema.optional(),
  weekStart: z.number().optional(),
});

type PreferencesContextValue = {
  preferences: Preferences;
  updatePreferences: (prefrences: Partial<Preferences>) => Promise<void>;
};

const PreferencesContext = React.createContext<PreferencesContextValue | null>(
  null,
);

export const PreferenceProvider = ({
  children,
  initialValue,
}: {
  children?: React.ReactNode;
  initialValue: Partial<Preferences>;
}) => {
  const { user } = useUser();

  const [preferences = {}, setPreferences] = useLocalStorage(
    "coordina.preferences",
    initialValue,
    {
      raw: false,
      serializer: JSON.stringify,
      deserializer: (value) => {
        try {
          return preferenceSchema.parse(JSON.parse(value));
        } catch {
          return {};
        }
      },
    },
  );

  // const updatePreferences =

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreferences: async (newPreference) => {
          setPreferences((prev) => ({
            ...prev,
            ...newPreference,
          }));

          if (user && !user.isGuest) {
            console.log("TODO:: Update Preferences prefrences.tsx");
          }
        },
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePrefrences = () => {
  return useRequiredContext(PreferencesContext);
};
