// useMe.js

import { useQuery } from "@tanstack/react-query"
import { fetchMe, getToken, ME_QUERY_KEY } from "../api/authApi";

// 로그인 한 사용자 정보를 가져오는 커스텀 훅 
export function useMe() {
  const token = getToken();

  return useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: fetchMe,
    enabled: !!token, // 토근이 있을 때만 
    retry: false,
    staleTime: 1000 * 60
  });

}
// const { data, inLoading, isPending } = useMe(); 사용
