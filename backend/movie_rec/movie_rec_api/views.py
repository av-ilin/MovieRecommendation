from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Todo, Movie
from .serializers import TodoSerializer, MovieSerializer
from scripts import lab03
import json
import os


class MovieApiView(APIView):
    # add permission to check if user is authenticated

    # permission_classes = None

    # 1. List all
    def get(self, request, *args, **kwargs):
        # movies = Movie.objects.filter(user=request.user.id)
        # serializer = (movies)
        return Response(data="Hello world", status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        '''
        Create the Todo with given todo data
        '''
        # serializer = MovieSerializer(data=data)
        # if serializer.is_valid():
        #     serializer.save()
        print(request.body)
        return Response(lab03.recomend(json.loads(request.body)), status=status.HTTP_201_CREATED)

        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
