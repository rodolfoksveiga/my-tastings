from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from .serializers import RegisterUserSerializer


class RegisterUser(APIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterUserSerializer

    def post(self, request, *args, **kwargs):
        form = RegisterUserSerializer(data=request.data)
        if form.is_valid():
            user = form.save()
            if user:
                return Response(status=HTTP_201_CREATED)
        return Response(form.errors, status=HTTP_400_BAD_REQUEST)
