import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();

  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null); // ESTADO PARA EL PERFIL COMPLETO
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = useCallback(async (sessionUser) => {
    if (sessionUser) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', sessionUser.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          setProfile(null);
          return null;
        }
        if (data) {
          setProfile(data); // Guardamos el perfil completo, incluyendo `is_admin`
          return data;
        }
      } catch (e) {
        console.error("Exception fetching profile:", e);
        setProfile(null);
        return null;
      }
    }
    return null;
  }, []);

  useEffect(() => {
    setLoading(true);
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        const sessionUser = session?.user ?? null;
        setUser(sessionUser);

        if (sessionUser) {
          await fetchUserProfile(sessionUser); // Obtenemos el perfil al cambiar la sesión
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchUserProfile]);
  
  const signUp = useCallback(async (email, password, fullName) => {
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
    if (error) {
      toast({ variant: "destructive", title: "Sign up Failed", description: error.message });
    }
    return { error };
  }, [toast]);
  
  const signIn = useCallback(async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    // onAuthStateChange se encargará de obtener el perfil
    return { error };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    // Limpiamos todos los estados al cerrar sesión
    setUser(null);
    setProfile(null);
    setSession(null);
  }, []);

  const value = useMemo(() => ({
    user,
    session,
    profile, // Exponemos el perfil a toda la aplicación
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile: () => user ? fetchUserProfile(user) : Promise.resolve(),
  }), [user, session, profile, loading, signUp, signIn, signOut, fetchUserProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};