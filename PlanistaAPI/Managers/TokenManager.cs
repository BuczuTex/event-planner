using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

using PlanistaAPI.DataLayer;

using Microsoft.IdentityModel.Tokens;

namespace PlanistaAPI.Managers {
    public class TokenManager {
        private readonly static string _secretKey = "Super-ultra-secret-key:2337122#@$";
        
        public static string GenerateJwtToken(User user, List<string> roles) {
            SecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            SigningCredentials signCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256); //256 bitów

            var claims = new List<Claim> {
                new Claim(Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, string.Join(",", roles))
            };

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: "https://localhost:4200",
                audience: "https://localhost:7290",
                claims: claims, 
                expires: DateTime.Now.AddHours(24),
                signingCredentials: signCredentials
            );

            var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);

            return encodedToken;
        }
        public static string GetUserIdFromToken(string token) {
            var decodedToken = new JwtSecurityTokenHandler().ReadToken(token);
            var securityToken = decodedToken as JwtSecurityToken;

            var sub = securityToken.Claims.First(x => x.Type == "sub").Value;

            return sub;
        }
        public static string GetRoleFromToken(string token) {
            var decodedToken = new JwtSecurityTokenHandler().ReadToken(token);
            var securityToken = decodedToken as JwtSecurityToken;

            var role = securityToken.Claims.First(x => x.Type == ClaimTypes.Role).Value;

            return role;
        }
    }
}