import { useState } from 'react';
import { artStyle } from '../data/mock';

/**
 * 앨범 자켓.
 *
 * 그라디언트를 배경으로 깔고 그 위에 실제 자켓 이미지를 올립니다.
 * 이미지가 로드되기 전 · 실패했을 때 · 자켓이 없는 항목(재생목록 · 장르)은
 * 그라디언트가 그대로 보이므로 빈 사각형이 뜨는 순간이 없습니다.
 */
export default function Cover({ item, className = '', children }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} style={artStyle(item.art)}>
      {item.cover && !failed && (
        <img
          src={item.cover}
          alt=""
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
      {children}
    </div>
  );
}
